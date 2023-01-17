class PerformanceAppraisalFormPolicy < ApplicationPolicy
	def index?
		authenticate
	end

	def show?
		authenticate || record.staff_id == user.id || record.boss_id == user.id
	end

	def show_self_review?
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
		authenticate || !record.any? { |item| item.staff_id != user.id }
	end

	def pa_forms_by_my_reviewed?
		authenticate || !record.any? { |item| item.boss_id != user.id }
	end

	def remind_by_staff?
		authenticate
  end

	private

	def authenticate
		user.has_role?(:Manager)
	end
end