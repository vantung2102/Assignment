# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Leaves::RespondToLeaveApplicationService, type: :service do
  subject { described_class.new(current_user, leave_application, status) }

  let(:department) { FactoryBot.create(:department) }
  let(:position) { FactoryBot.create(:position) }
  let(:job_title) { FactoryBot.create(:job_title) }
  let!(:current_user) do
    FactoryBot.create(:staff,
                      department_id: department.id,
                      position_id: position.id,
                      job_title_id: job_title.id)
  end
  let(:leave) { FactoryBot.create(:leave, staff_id: current_user.id) }
  let!(:status) { :approved }

  context 'Response success' do
    let!(:leave_application) do
      FactoryBot.create(
        :leave_application,
        number_of_days_off: 2,
        staff_id: current_user.id
      )
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be true }
    end
  end

  context 'Response faild' do
    let!(:leave_application) do
      FactoryBot.create(
        :leave_application,
        number_of_days_off: 20,
        staff_id: current_user.id
      )
    end

    describe '.call' do
      let!(:result) { subject.call }
      it { expect(result.first).to be false }
      it { expect(result.last).to eq(I18n.t('error_codes.E209')) }
    end
  end
end
