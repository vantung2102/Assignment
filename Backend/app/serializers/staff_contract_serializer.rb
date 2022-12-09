# == Schema Information
#
# Table name: staff_contracts
#
#  id          :bigint           not null, primary key
#  title       :string
#  staff_id    :bigint
#  start_date  :date
#  end_date    :date
#  status      :integer
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class StaffContractSerializer < BaseSerializer
  attributes  :id,
              :title,
              :description,
              :start_date,
              :end_date,
              :status,
              :staff
end
