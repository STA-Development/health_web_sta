import React from "react"
import Image from "next/image"

interface IMemberData {
  id: number
  name: string
  results: number
  isSelected: boolean
}

interface IMember {
  member: IMemberData
  members: IMemberData[]
  setMembers: (value: IMemberData[]) => void
}

const Member = ({ member, members, setMembers } : IMember) => {

  const selectMember = (id) => {
    const newMembers = members.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isSelected: !item.isSelected
        }
      }
      return item
    })

    setMembers(newMembers)
  }

  return (
    <div className="member">
      <div className="member__info">
        <div className="member__credentials">
          <div>
            <div className="member__name">{member.name}</div>
            <div className="member__results">{member.results} Results</div>
          </div>
          { member.isSelected && (
            <span>
              <Image src="/checked.svg" width={21} height={16} />
            </span>
          ) }
        </div>
      </div>
      <button
        type="button"
        className={!member.isSelected ? "button member__button" : "button member__button member__button_edit"}
        onClick={() => selectMember(member.id)}
      >
        { !member.isSelected ? "Select" : "Edit" }
      </button>
    </div>
  )
}

export default Member
