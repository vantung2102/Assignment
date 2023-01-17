class StaffOnboardingPolicy < ApplicationPolicy

	def update?
		authenticate
	end

	def destroy?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end
