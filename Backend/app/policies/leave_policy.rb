class LeavePolicy < ApplicationPolicy
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

  def leave_by_user?
		authenticate || record.staff_id == user.id
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end