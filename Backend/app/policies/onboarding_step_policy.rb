class OnboardingStepPolicy < ApplicationPolicy
	def index?
		authenticate
	end

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

	def complete_onboarding_step?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end
