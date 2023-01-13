class Api::V1::StaffManagement::StaffsController < Api::V1::BaseController
  def index
    
    # binding.pry
    
    pagy, staffs = paginate(Staff.filter(params.slice(:fullname, :position, :department, :job_title)))
    render_resource_collection(
      staffs.includes(:position, :department, :job_title, :upper_level, :lower_levels, :roles).order(created_at: :desc),
      pagy: pagy
    )
  end

  def get_all_staff
    render_resource_collection(Staff.where(status: :active).includesModel)
  end

  def show
    authorize staff
    render_resource(staff)
  end

  def create
    authorize Staff
    begin
      ActiveRecord::Base.transaction do
        staff = Staff.create!(staff_params)
        render_resource(staff, status: :created)
      end
    rescue StandardError => e
      render_resource_errors(detail: e)
    end
  end

  def update
    authorize staff
    staff.update(staff_params) ? render_resource(staff) : render_resource_errors(staff.errors)
  end

  def update_staff_activation_status
    staff
    update, staff = Staffs::UpdateStaffActivationStatusService.call(@staff, params[:status])
    update ? render_resource(staff) : render_resource_errors(detail: staff)
  end

  def destroy
    authorize Staff
    staff.destroy!
    head :no_content
  end

  def destroy_and_update_staff_boss
    authorize Staff

    begin
      ActiveRecord::Base.transaction do
        staff.lower_levels.update_all(staff_id: params[:boss_id])
        staff.destroy!
      end
      head :ok
    rescue StandardError => e
      render json: { status: 'error', detail: e }
    end
  end

  def get_inactive_staff
    authorize Staff
    staffs = Staff.only_deleted
    render_resource_collection(staffs)
  end

  def recover_staff
    authorize Staff

    begin
      ActiveRecord::Base.transaction do
        staff = Staff.only_deleted.find(params[:id])
        if staff.recover
          create, leave = Leaves::CreateLeaveService.call(staff)
          raise leave unless create
        else
          raise I18n.t('error_codes.E207')
        end
      end
      head :ok
    rescue StandardError => e
      render json: { status: 'error', detail: e }
    end
  end

  def permanent_destroy
    authorize Staff

    staff = Staff.only_deleted.find(id: params[:id]).update(staff_id: nil)
    staff.destroy
    head :no_content
  end

  private

  def staff
    @staff ||= Staff.find(params[:id])
  end

  def staff_params
    params.require(:staff).permit(
      :fullname,
      :date_of_birth,
      :join_date,
      :gender,
      :phone,
      :address,
      :email,
      :password,
      :position_id,
      :department_id,
      :job_title_id,
      :status,
      :staff_id
    )
  end
end
