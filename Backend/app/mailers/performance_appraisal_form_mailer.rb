class PerformanceAppraisalFormMailer < ApplicationMailer
	def remind(form)
		@form = form
		@staff = Staff.find(@form.staff_id)
		mail to: @staff.email, subject: "Remind submit Performance Appraisal Form"
	end
end