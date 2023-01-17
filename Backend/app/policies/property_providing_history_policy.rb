class PropertyProvidingHistoryPolicy < ApplicationPolicy
	def index?
		authenticate
	end

	def show?
		authenticate
	end

	def update?
		authenticate
	end

	def destroy?
		authenticate
	end

	def property_recall?
		authenticate
	end

	def histories_by_property?
		authenticate
	end

	private

	def authenticate
		user.has_role?(:Manager) 
	end
end