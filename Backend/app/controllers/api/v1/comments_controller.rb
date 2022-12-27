class Api::V1::CommentsController < Api::V1::BaseController
  def create
    comment = Comment.new(comment_params)
    comment.staff_id = current_user.id
    comment.save ? render_resource(comment, status: :created) : render_resource_errors(comment.errors)
  end

  def update
    comment.update(comment_params) ? render_resource(comment) : render_resource_errors(comment.errors)
  end

  def destroy
    comment.destroy!
    head :no_content
  end

  private

  def comment
    @comment ||= Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :commentable_id, :commentable_type)
  end
end
