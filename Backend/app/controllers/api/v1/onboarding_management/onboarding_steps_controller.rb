class Api::V1::OnboardingManagement::OnboardingStepsController < Api::V1::BaseController
  def show
    authorize OnboardingStep
    render_resource(onboarding_step)
  end

  def create; end

  def update
    authorize OnboardingStep
    onboarding_step.update(onboarding_step_params) ? render_resource(onboarding_step) : render_resource_errors(onboarding_step.errors)
  end

  def destroy
    authorize OnboardingStep
    onboarding_step.destroy!
    head :no_content
  end

  def onboarding_steps_by_staff_onboarding
    authorize OnboardingStep
    pagy, onboarding_step = paginate(OnboardingStep.where(staff_onboarding_id: params[:staff_onboarding_id]))
    render_resource_collection(onboarding_step, pagy: pagy)
  end
  
  private

  def onboarding_step
    @onboarding_step ||= OnboardingStep.find(params[:id])
  end

  def onboarding_step_params
    params.require(:onboarding_step).permit(:status, :assigned_person_id, :started_date, :due_date)
  end
end

