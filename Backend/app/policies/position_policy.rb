class PositionPolicy < ApplicationPolicy
	def index?; end

	def show?
		authenticate
	end

	def new?
		authenticate
	end

	def create?
		authenticate
	end

	def edit?
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
		user.has_role?(:CEO) || user.has_role?(:MANAGER) || user.has_role?(:HR)
	end
end