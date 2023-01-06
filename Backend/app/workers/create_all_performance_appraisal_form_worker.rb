# inside app/jobs/hello_world_job.rb
class CreateAllPerformanceAppraisalFormWorker < BaseWorker
  def perform(params)
    params = JSON.parse(params)
    p'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
    Staff.all.each do |staff|
      PerformanceAppraisalForm.create!(
        status: :in_progress,
        active: true,
        staff_id: staff.id,
        boss_id: staff.staff_id,
        start_date: params['start_date'],
        end_date: params['end_date'],
      )
    end
  end
end