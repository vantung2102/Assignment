class Api::V1::StaffManagement::JobTitlesController < Api::V1::BaseController
  def index
    authorize JobTitle
    pagy, job_titles = paginate(JobTitle.order(created_at: :desc))
    render_resource_collection(job_titles, pagy: pagy)
  end

  def show
    authorize JobTitle
    render_resource(job_title)
  end

  def create
    authorize JobTitle
    job_title = JobTitle.new(job_title_params)
    JobTitle.save ? render_resource(job_title, status: :created) : render_resource_errors(job_title.errors)
  end

  def update
    authorize JobTitle
    JobTitle.update(job_title_params) ? render_resource(job_title) : render_resource_errors(job_title.errors)
  end

  def destroy
    authorize JobTitle
    JobTitle.destroy!
    head :no_content
  end

  private

  def job_title
    @job_title ||= JobTitle.find(params[:id])
  end

  def job_title_params
    params.require(:job_title).permit(:title, :description)
  end
end
