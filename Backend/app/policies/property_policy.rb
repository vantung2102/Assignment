class PropertyPolicy < ApplicationPolicy
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

	def response_property_request?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end