class Movie < ActiveRecord::Base
  attr_accessible :director, :genre, :name, :year
end
