require 'pagy/extras/overflow'
require 'pagy/extras/metadata'
require 'pagy/extras/array'

Pagy::DEFAULT[:items] = 15
Pagy::DEFAULT[:metadata] = %i[items count page prev next last]
Pagy::DEFAULT[:overflow] = :empty_page