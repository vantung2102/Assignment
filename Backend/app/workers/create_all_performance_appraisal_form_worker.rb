# inside app/jobs/hello_world_job.rb
class CreateAllPerformanceAppraisalFormWorker < BaseWorker
  def perform(params)
    params = JSON.parse(params)
    Staff.all.each do |staff|
      PerformanceAppraisalForm.create!(
        status: PerformanceAppraisalForm.statuses[:in_progress],
        active: false,
        staff_id: staff.id,
        boss_id: staff.staff_id,
        start_date: params['start_date'],
        due_date: params['end_date'],
      )
    end
  end
end