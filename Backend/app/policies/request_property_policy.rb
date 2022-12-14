class RequestPropertyPolicy < ApplicationPolicy
	def index?
		true
	end

	def show?
		authenticate || (record.staff_id == user.id)
	end

	def create?
		true
	end

	def update?
		authenticate || (record.staff_id == user.id)
	end

	def destroy?
		authenticate || (record.staff_id == user.id)
	end

	def response_request?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end