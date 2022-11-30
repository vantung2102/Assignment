class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: %i[show update destroy]

  def index
    pagy, users = paginate(User.order(created_at: :desc))
    render_resource_collection(users, pagy: pagy)
  end

  def show
    render_resource(@user)
  end

  def create
    user = User.new(user_params)
    user.save ? render_resource(user, status: :created) : render_resource_errors(user.errors)
  end

  def update
    @user.update(user_params) ? render_resource(@user) : render_resource_errors(@user.errors)
  end

  def destroy
    @user.destroy!
    head :no_content
  end
                                                                        
  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:full_name, :email, :password, :password_confirmation)
  end
end
