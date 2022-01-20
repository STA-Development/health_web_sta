import React, {useEffect, useState} from "react"
import PureBlock from "@fh-health/component/pureBlock"
import Image from "next/image"
import Member from "@fh-health/component/base/migration/member"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"
import migrationManager from "@fh-health/manager/migrationManager"

enum memberSelectType {
  Select = "select",
  Edit = "edit"
}

const MigrationFlowView = () => {
  const [confirmButtonState, setConfirmButtonState] = useState<boolean>(false)
  const [initialModalView, setInitialModalView] = useState<boolean>(true)
  const [organizedDataModal, setOrganizedDataModal] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [determineUserView, setDetermineUserView] = useState<boolean>(false)
  const [successModalView, setSuccessModalView] = useState<boolean>(false)
  const [finalModalView, setFinalModalView] = useState<boolean>(false)
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState({
    id: null,
    firstName: "",
    isSelected: false,
    resultsCount: null,
  })

  const selectMember = (id) => {
    setOrganizedDataModal(true)
    const selectedUser = members.filter(member => member.id === id)
    setSelectedMember(selectedUser[0])
  }

  const confirmMember = (type = memberSelectType.Select) => {
    if (type === memberSelectType.Select) {
      setOrganizedDataModal(false)
    } else {
      setDetermineUserView(true)
      setSelectedMember({...selectedMember, isSelected: false})
    }

    const newMembers = members.map(item => {
      if (item.id === selectedMember.id) {
        return {
          ...item,
          isSelected: true
        }
      }
      return item
    })

    setMembers(newMembers)
  }

  const editMember = (id) => {
    selectMember(id)
    setIsEditMode(true)
  }

  const addMemberAsNew = () => {
    setSuccessModalView(true)
    setIsEditMode(false)
    setDetermineUserView(false)
    setOrganizedDataModal(false)
  }

  const displayMigrationInitialModal = () => (
    <div className="migration-modal">
      <Modal>
        <Card permissions>
          <div className="card__header">
            <h4 className="card__header-title">Migrate Your Results</h4>
            <p className="card__header-message">
              Looks like you have used our services before. We&apos;ll need your help to migrate the existing results.
            </p>
          </div>
          <button
            type="button"
            className="button card__button"
            onClick={() => setInitialModalView(false)}
          >
            Continue
          </button>
        </Card>
      </Modal>
    </div>
  )

  const displayOrganizedDataModal = () => (
    <div className="migration-modal">
      <Modal>
        <Card permissions>
          {!determineUserView ? (
            <>
              <div className="card__header">
                <h4 className="card__header-title">Organize Data</h4>
                <p className="card__header-message">
                  Who does the result for {selectedMember.firstName} belong to?
                </p>
              </div>
              <button
                type="button"
                className="button card__button migration-modal__button"
                onClick={() => !isEditMode ? confirmMember() : confirmMember(memberSelectType.Edit)}
              >
                You
              </button>
              <button
                type="button"
                className="button card__button migration-modal__button"
                onClick={() => !isEditMode ? confirmMember() : confirmMember(memberSelectType.Edit)}
              >
                Dependent, Family or Friend
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setDetermineUserView(false)}
                className="button card__close card__close_left card__back-arrow"
              >
                <Image src="/backwardArrow.svg" width={24} height={24} alt="close" />
              </button>
              <div className="card__header">
                <h4 className="card__header-title">Organize Data</h4>
                <p className="card__header-message">
                  Does {selectedMember.firstName} happen to map one of your existing profiles?
                </p>
              </div>
              <div className="migration__members">
                <Member member={selectedMember}>
                  <button
                    type="button"
                    className="button member__button"
                    onClick={() => {
                      confirmMember()
                      setIsEditMode(false)
                      setDetermineUserView(false)
                      setOrganizedDataModal(false)
                    }}
                  >
                    Select
                  </button>
                </Member>
              </div>
              <button
                type="button"
                className="button card__button migration-modal__button"
                onClick={() => addMemberAsNew()}
              >
                Add as New
              </button>
            </>
          )}
        </Card>
      </Modal>
    </div>
  )

  const displaySuccessModal = () => (
    <div className="migration-modal migration-modal_success">
      <Modal>
        <Card permissions>
          <div className="card__media card__media_sm">
            <Image src="/check.svg" alt="kit number" height={64} width={64} />
          </div>
          <div className="card__header">
            <h4 className="card__header-title">Success!</h4>
            <p className="card__header-message">
              Added {selectedMember.firstName} as a new Dependent/Family/Friend
            </p>
          </div>
          <button
            type="button"
            className="button card__button"
            onClick={() => setSuccessModalView(false)}
          >
            Ok
          </button>
        </Card>
      </Modal>
    </div>
  )

  const displayFinalModal = () => (
    <div className="migration-modal migration-modal_success">
      <Modal>
        <Card permissions>
          <div className="card__media card__media_sm">
            <Image src="/check.svg" alt="kit number" height={64} width={64} />
          </div>
          <div className="card__header">
            <h4 className="card__header-title">You&apos;re all set!</h4>
          </div>
          <button
            type="button"
            className="button card__button"
            onClick={() => setFinalModalView(false)}
          >
            Continue
          </button>
        </Card>
      </Modal>
    </div>
  )

  useEffect(() => {
    (async () => {
      const { data } = await migrationManager.getPatientsList()
      const membersList = data.data.map((member, index) => ({...member, id: index, isSelected: false}))
      setMembers(membersList)
    })()
  }, [])

  useEffect(() => {
    if (members.every(member => member.isSelected)) {
      setConfirmButtonState(true)
    } else {
      setConfirmButtonState(false)
    }
  }, [members])

  return (
    <>
      <div className="pure-block-wrapper migration">
        <PureBlock flow center={false} isNoResults={false}>
          <div className="logo">
            <Image src="/logo.svg" width={136} height={16} alt="logo" />
          </div>
          <h4 className="header">Migration Wizard</h4>
          <p className="message">
            Select which one of these belong to you
            (include variations or misspellings of your name) or dependents, family, or friends.
          </p>
          <div className="migration__members">
            {
              members.map((member, index) => (
                <Member
                  key={index}
                  member={member}
                >
                  <button
                    type="button"
                    className={!member.isSelected ? "button member__button" : "button member__button member__button_edit"}
                    onClick={() => !member.isSelected ? selectMember(member.id) : editMember(member.id)}
                  >
                    { !member.isSelected ? "Select" : "Edit" }
                  </button>
                </Member>
              ))
            }
          </div>
          <div className="inputGroup">
            <button
              type="button"
              className={
                confirmButtonState
                  ? 'button inputGroup__button migration__button migration__button_active'
                  : 'button inputGroup__button migration__button inputGroup__button_disabled'
              }
              onClick={() => setFinalModalView(true)}
            >
              Confirm
            </button>
          </div>
        </PureBlock>
      </div>
      {initialModalView && displayMigrationInitialModal()}
      {organizedDataModal && displayOrganizedDataModal()}
      {successModalView && displaySuccessModal()}
      {finalModalView && displayFinalModal()}
    </>
  )
}

export default MigrationFlowView;