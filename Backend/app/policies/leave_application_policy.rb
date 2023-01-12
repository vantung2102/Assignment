class LeaveApplicationPolicy < ApplicationPolicy
	def index?
		true
	end

	def show?
		authenticate || record.staff_id == user.id
	end

	def update?
		authenticate || record.staff_id == user.id
	end

	def destroy?
		authenticate || record.staff_id == user.id
	end

	def respond_to_leave_application?
		authenticate
	end

	def leave_application_by_status?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end