class PerformanceAppraisalFormPolicy < ApplicationPolicy
	def index?
		authenticate
	end

	def show?
		authenticate || record.staff_id == user.id || record.boss_id == user.id
	end

	def create?
		authenticate
	end

	def create_all_fa_forms_for_staff?
		authenticate
	end

	def update?
		record.staff_id == user.id || record.boss_id == user.id
	end

	def destroy?
		authenticate
	end

  def update_pa_form_activation_status?
    authenticate
  end

	def update_all_active_or_inactive?
		authenticate
	end

	def pa_forms_by_current_user?
		false if record.map{ |el| el.staff_id == user.id }.include?(false)
	end

	def pa_forms_by_my_reviewed?
		false if record.map{ |el| el.boss_id == user.id }.include?(false)
	end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end