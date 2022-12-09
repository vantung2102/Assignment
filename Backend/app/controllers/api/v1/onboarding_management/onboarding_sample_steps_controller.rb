class Api::V1::OnboardingManagement::OnboardingSampleStepsController < Api::V1::BaseController
  def show
    authorize OnboardingSampleStep
    render_resource(onboarding_sample_step)
  end

  def create
    authorize OnboardingSampleStep
    onboarding_sample_step = OnboardingSampleStep.new(onboarding_sample_step_params)
    onboarding_sample_step.save ? render_resource(onboarding_sample_step, status: :created) : render_resource_errors(onboarding_sample_step.errors)
  end

  def update
    authorize OnboardingSampleStep
    onboarding_sample_step.update(onboarding_sample_step_params) ? render_resource(onboarding_sample_step) : render_resource_errors(onboarding_sample_step.errors)
  end

  def destroy
    authorize OnboardingSampleStep
    onboarding_sample_step.destroy!
    head :no_content
  end

  def onboarding_sample_steps_by_position
    authorize OnboardingSampleStep
    pagy, onboarding_sample_step = paginate(OnboardingSampleStep.by_position(onboarding_sample_step_params[:position_id]))
    render_resource_collection(onboarding_sample_step, pagy: pagy)
  end

  private

  def onboarding_sample_step
    @onboarding_sample_step ||= OnboardingSampleStep.find(params[:id])
  end

  def onboarding_sample_step_params
    params.require(:onboarding_sample_step).permit(:task, :description, :position_id)
  end
end

