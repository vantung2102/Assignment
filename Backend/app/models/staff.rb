# == Schema Information
#
# Table name: staffs
#
#  id              :bigint           not null, primary key
#  fullname        :string
#  date_of_birth   :date
#  gender          :string
#  status          :integer
#  position_id     :bigint
#  department_id   :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  staff_id        :bigint
#  email           :string
#  password_digest :string
#  deleted_at      :datetime
#  job_title_id    :bigint
#
class Staff < ApplicationRecord
  include PgSearch::Model
  extend Filterable

  rolify
  has_secure_password
  acts_as_xlsx
  acts_as_paranoid

  after_create :create_onboarding
  
  enum status: { active: 0, inactive: 2, probation: 3}

  belongs_to :upper_level, class_name: 'Staff', optional: true, foreign_key: :staff_id
  has_many :lower_levels, class_name: 'Staff'

  has_many :provided, class_name: 'ProvideAsset', :foreign_key => 'provider_id'
  has_many :be_provided, class_name: 'ProvideAsset', :foreign_key => 'receiver_id'

  has_many :requested, class_name: 'RequestProperty', :foreign_key => 'requester_id'
  has_many :be_requested, class_name: 'RequestProperty', :foreign_key => 'approver_id'

  has_many :person_leave_application, class_name: 'LeaveApplication', :foreign_key => 'staff_id'
  has_many :approved_person_leave_application, class_name: 'LeaveApplication', :foreign_key => 'approver_id'

  has_many :staff_onboardings
  has_many :onboarding_assigned_person, class_name: 'OnboardingStep', :foreign_key => 'assigned_person_id'

  has_one :leave, dependent: :destroy
  has_one :staff_contract
  belongs_to :position
  belongs_to :department
  belongs_to :job_title


  validates :fullname, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, allow_nil: true

  pg_search_scope :filter_by_fullname, against: :fullname
  scope :filter_by_position, -> (position_id) { where position_id: position_id }
  scope :filter_by_job_title, -> (job_title_id) { where job_title_id: job_title_id }
  scope :filter_by_department, -> (department_id) { where department_id: department_id }

  private

  def create_onboarding
    create, onboarding = Onboarding::CreateOnboardingService.call(self)
    raise onboarding if create == false
  end
end
