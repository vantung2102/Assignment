# inside app/jobs/hello_world_job.rb
class RemindAllPerformanceAppraisalFormWorker < BaseWorker
  def perform
    staff_not_submit = PerformanceAppraisalForm.where(active: true)
    staff_not_submit = staff_not_submit.reviewer_reviewed_status
    staff_not_submit.each do |form|
      PerformanceAppraisalFormMailer.remind(form).deliver_later
    end
  end
end