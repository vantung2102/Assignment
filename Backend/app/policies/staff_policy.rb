class StaffPolicy < ApplicationPolicy
	def index?
		true
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

	def destroy_and_update_staff_boss?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager) || user.has_role?(:Hr_Manager) 
	end
end