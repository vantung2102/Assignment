class Api::V1::OnboardingManagement::StaffOnboardingsController < Api::V1::BaseController
  def create; end

  def update
    authorize StaffOnboarding
    staff_onboarding.update(staff_onboarding_params) ? render_resource(staff_onboarding) : render_resource_errors(staff_onboarding.errors)
  end

  def destroy
    authorize StaffOnboarding
    staff_onboarding.destroy!
    head :no_content
  end

  private

  def staff_onboarding
    @staff_onboarding ||= StaffOnboarding.find(params[:id])
  end

  def staff_onboarding_params
    params.require(:staff_onboarding).permit(:status, :assigned_person_id)
  end
end

