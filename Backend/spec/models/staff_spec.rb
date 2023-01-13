require 'rails_helper'

RSpec.describe Staff, type: :model do
  it do
    should define_enum_for(:status)
    .with_values(active: 0, inactive: 1)
    .backed_by_column_of_type(:integer)
  end

  it do
    is_expected.to belong_to(:upper_level)
    .class_name(:Staff)
    .without_validating_presence
    .with_foreign_key(:staff_id)
  end
  it do
    is_expected.to have_many(:lower_levels)
    .class_name(:Staff)
  end

  it do
    is_expected.to have_many(:provided)
    .class_name(:PropertyProvidingHistory)
    .with_foreign_key(:provider_id)
  end
  it do
    is_expected.to have_many(:be_provided)
    .class_name(:PropertyProvidingHistory)
    .with_foreign_key(:receiver_id)
  end

  it do
    is_expected.to have_many(:requested)
    .class_name(:RequestProperty)
    .with_foreign_key(:requester_id)
  end
  it do
    is_expected.to have_many(:be_requested)
    .class_name(:RequestProperty)
    .with_foreign_key(:approver_id)
  end

  it do
    is_expected.to have_many(:person_leave_application)
    .class_name(:LeaveApplication)
    .with_foreign_key(:staff_id)
  end
  it do
    is_expected.to have_many(:approved_person_leave_application)
    .class_name(:LeaveApplication)
    .with_foreign_key(:approver_id)
  end

  it do
    is_expected.to have_many(:staff_onboardings)
    .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:onboarding_assigned_person)
    .class_name(:OnboardingStep)
    .with_foreign_key(:assigned_person_id)
    .dependent(:destroy)
  end

  it do
    is_expected.to have_many(:performance_appraisal_form)
    .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:review_for_staff)
    .class_name(:PerformanceAppraisalForm)
    .with_foreign_key(:boss_id)
    .dependent(:destroy)
  end

  it { is_expected.to have_one(:leave).dependent(:destroy) }
  it { is_expected.to belong_to(:position) }
  it { is_expected.to belong_to(:department) }
  it { is_expected.to belong_to(:job_title) }

  it { should validate_presence_of(:fullname) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password).allow_nil }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }

  describe "validates uniqueness of email" do
    let!(:staff) { FactoryBot.create(:staff,
      department_id: department.id,
      position_id: position.id,
      job_title_id: job_title.id) 
    }

    it "Unique email" do
      staff = FactoryBot.build(:staff,
        department_id: department.id,
        position_id: position.id,
        job_title_id: job_title.id,
      )
      expect(staff).not_to be_valid
    end
    it "Not unique email" do
      staff = FactoryBot.create(
        :staff,
        department_id: department.id,
        position_id: position.id,
        job_title_id: job_title.id,
        email: 'vantung@gmail.com'
      )
      expect(staff).to be_valid
    end
  end

  describe "CallBack" do
    let(:staff) { FactoryBot.build(:staff,
      department_id: department.id,
      position_id: position.id,
      job_title_id: job_title.id,
    ) }

    it "before_create" do
      staff.save
      expect(staff.status).to eq('active')
    end
  end
  
  it "filter_by_position" do
    position1 = FactoryBot.create(:position)
    position2 = FactoryBot.create(:position)
    staff = FactoryBot.create(:staff, department_id: department.id,
      position_id: position.id, job_title_id: job_title.id, email: Faker::Internet.email
    )
    staff1 = FactoryBot.create(:staff, department_id: department.id,
      position_id: position1.id, job_title_id: job_title.id, email: Faker::Internet.email
    )
    staff2 = FactoryBot.create(:staff, department_id: department.id,
      position_id: position2.id, job_title_id: job_title.id, email: Faker::Internet.email
    )

    expect(Staff.filter_by_position(position.id)).to include(staff)
    expect(Staff.filter_by_position(position.id)).to_not include(staff1, staff2)
  end

  it "filter_by_job_title" do
    job_title1 = FactoryBot.create(:job_title)
    job_title2 = FactoryBot.create(:job_title)
    staff = FactoryBot.create(:staff, department_id: department.id,
      job_title_id: job_title.id, position_id: position.id, email: Faker::Internet.email
    )
    staff1 = FactoryBot.create(:staff, department_id: department.id,
      job_title_id: job_title1.id, position_id: position.id, email: Faker::Internet.email
    )
    staff2 = FactoryBot.create(:staff, department_id: department.id,
      job_title_id: job_title2.id, position_id: position.id, email: Faker::Internet.email
    )

    expect(Staff.filter_by_job_title(job_title.id)).to include(staff)
    expect(Staff.filter_by_job_title(job_title.id)).to_not include(staff1, staff2)
  end
end
