class Api::V1::OnboardingManagement::OnboardingStepsController < Api::V1::BaseController
  def index; end

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
    begin
      staff_onboardings = StaffOnboarding.find_by(staff_id: params[:staff_id], active: true)
      onboarding_step = OnboardingStep.where(staff_onboarding_id: staff_onboardings.id)
      render_resource_collection(onboarding_step)
    rescue StandardError => e
      render json: { status: 'error', detail: e }
    end
  end

  def complete_onboarding_step
    authorize OnboardingStep
    begin
      if onboarding_step.assigned_person_id.nil? || onboarding_step.start_date.nil? || onboarding_step.due_date.nil?
        raise I18n.t('errors.E210')
      end

      onboarding_step.update!(status: :completed)
      render_resource(onboarding_step)
    rescue StandardError
      render_resource_errors(status: 'error', detail: I18n.t('errors.E207'))
    end
  end

  private

  def onboarding_step
    @onboarding_step ||= OnboardingStep.find(params[:id])
  end

  def onboarding_step_params
    params.require(:onboarding_step).permit(:status, :assigned_person_id, :start_date, :due_date)
  end
end
