class StaffPolicy < ApplicationPolicy
	def index?
		authenticate
	end

	def show?
		authenticate || record.id == user.id
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

  def get_inactive_staff?
		authenticate
	end

	def recover_staff?
		authenticate
	end

	def permanent_destroy?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end