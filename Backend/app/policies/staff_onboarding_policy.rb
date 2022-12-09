class StaffOnboardingPolicy < ApplicationPolicy
  def show?
		authenticate || user.id == record.assigned_person_id
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

  def responed_to_staff_onboarding?
		authenticate || user.id == record.assigned_person_id
	end

	private

	def authenticate
		user.has_role?(:Hr_Manager)
	end
end
