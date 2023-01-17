class RequestPropertyPolicy < ApplicationPolicy
	def index?
		authenticate
	end

	def show?
		authenticate || (record.requester_id == user.id)
	end

	def create?
		true
	end

	def update?
		authenticate || (record.requester_id == user.id)
	end

	def destroy?
		authenticate || (record.requester_id == user.id)
	end

	def response_request?
		authenticate
	end

	def requests_by_status?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end