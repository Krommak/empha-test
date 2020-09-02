import React, { useContext} from 'react'
import Filter from '../Filter'
import { tokenContext } from '../../../authorized/authorized'

const FilterWrap = props => {

  const tokenCont = useContext(tokenContext)

  return (
      <div>
          <Filter token={tokenCont}/>
      </div>
  )

}

export default FilterWrap