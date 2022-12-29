class PropertyProvidingHistoryPolicy < ApplicationPolicy
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

	def property_recall?
		user.has_role?(:Manager)
	end

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end