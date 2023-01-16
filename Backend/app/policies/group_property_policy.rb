class GroupPropertyPolicy < ApplicationPolicy
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

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end