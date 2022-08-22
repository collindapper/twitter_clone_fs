 module Api 
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: { success: false }, status: :bad_request
      end
    end

    private

      def user_params
        params.require(:user).permit(:username, :password, :email)
      end
  end
end