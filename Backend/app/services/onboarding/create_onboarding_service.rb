class Onboarding::CreateOnboardingService < ApplicationService
  def initialize(staff)
    @staff = staff
  end

  def call
    begin
      ActiveRecord::Base.transaction do
        staff.staff_onboardings.update_all(active: false) if staff.staff_onboardings.present?

        staff_onboarding = staff.staff_onboardings.create!(active: true, position_id: staff.position_id)
        onboarding_sample_steps = OnboardingSampleStep.by_position(staff.position_id)
        onboarding_sample_steps.each do |item|
          item.onboarding_steps.create!(staff_onboarding_id: staff_onboarding.id, status: OnboardingStep.statuses[:outstanding])
        end

        [true, staff_onboarding]
      end
    rescue StandardError => e
      [false, e]
    end
  end

  private

  attr_accessor :staff
end
