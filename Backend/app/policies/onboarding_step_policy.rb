class OnboardingStepPolicy < ApplicationPolicy
	def show?
		authenticate
	end

	def create?
		authenticate
	end

	def update?
		authenticate
	end

	def destroy?
		authenticate
	end

  def onboarding_steps_by_staff_onboarding?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Hr_Manager)
	end
end
