import React, {useEffect, useState} from "react"
import PureBlock from "@fh-health/component/pureBlock"
import Image from "next/image"
import Member from "@fh-health/component/base/migration/member"
import Modal from "@fh-health/component/utils/modal"
import Card from "@fh-health/component/utils/card"
import migrationManager from "@fh-health/manager/migrationManager"
import CircleLoader from "@fh-health/component/utils/circleLoader"
import * as Sentry from "@sentry/nextjs"
import {UseAuthDataStateValue} from "@fh-health/context/authContext"

enum memberSelectType {
  Dependent = "dependent",
  You = "you"
}

const MigrationFlowView = () => {
  const [confirmButtonState, setConfirmButtonState] = useState<boolean>(false)
  const [initialModalView, setInitialModalView] = useState<boolean>(true)
  const [organizedDataModal, setOrganizedDataModal] = useState<boolean>(false)
  const [dependentUserView, setDependentUserView] = useState<boolean>(false)
  const [successModalView, setSuccessModalView] = useState<boolean>(false)
  const [finalModalView, setFinalModalView] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [members, setMembers] = useState([])
  const [patientsForMigration, setPatientsForMigration] = useState([])
  const [isHostPatientDefined, setIsHostPatientDefined] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState({
    id: null,
    firstName: "",
    isSelected: false,
    resultsCount: null,
    idPatient: null,
  })

  const { authDataState } = UseAuthDataStateValue()

  const selectMember = (id) => {
    setOrganizedDataModal(true)
    const selectedUser = members.filter(member => member.id === id)
    setSelectedMember(selectedUser[0])
  }

  const confirmMember = (type = memberSelectType.You) => {
    if (type === memberSelectType.You) {
      setOrganizedDataModal(false)
      setPatientsForMigration([...patientsForMigration, {
        notConfirmedPatientId: selectedMember?.idPatient,
        action: "MERGE",
        patientId: authDataState.patientAccountInformation.organizations?.[0]?.patientId
      }])
    } else {
      setDependentUserView(true)
      setSelectedMember({...selectedMember, isSelected: false})
    }

    const newMembers = members.map(item => {
      if (item.id === selectedMember.id) {
        if (type === memberSelectType.You) {
          setIsHostPatientDefined(true)
          return {
            ...item,
            isSelected: true,
            you: true
          }
        }

        if (item.you) {
          setIsHostPatientDefined(false)
          return {
            ...item,
            isSelected: true,
            you: false
          }
        }

        return {
          ...item,
          isSelected: true
        }
      }

      return item
    })

    setMembers(newMembers)
  }

  const resetOrganizedViewsState = () => {
    setDependentUserView(false)
    setOrganizedDataModal(false)
  }

  const addMemberAsNew = () => {
    setSuccessModalView(true)
    resetOrganizedViewsState()
  }

  const getUnconfirmedPatients = async () => {
    setIsFetching(true)
    try {
      const { data } = await migrationManager.getPatientsList()
      const membersList = data.data.map((member, index) => ({...member, id: index, isSelected: false}))
      setMembers(membersList)
    } catch (err) {
      Sentry.captureException(err)
    }
    setIsFetching(false)
  }

  const confirmPatientsResults = async () => {
    setLoading(true)
    try {
      const { status } = await migrationManager.migrateSelectedPatients(patientsForMigration)
      if (status === 201) {
        setFinalModalView(true)
      }
    } catch (err) {
      Sentry.captureException(err)
    }
    setLoading(false)
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
          {!dependentUserView ? (
            <>
              <div className="card__header">
                <h4 className="card__header-title">Organize Data</h4>
                <p className="card__header-message">
                  Who does the result for {selectedMember.firstName} belong to?
                </p>
              </div>
              <button
                type="button"
                className={
                  !isHostPatientDefined
                  ? "button card__button migration-modal__button"
                  : "button button_disabled card__button card__button_disabled"
                }
                onClick={() => confirmMember()}
              >
                You
              </button>
              <button
                type="button"
                className="button card__button migration-modal__button"
                onClick={() => confirmMember(memberSelectType.Dependent)}
              >
                Dependent, Family or Friend
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setDependentUserView(false)}
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
                      confirmMember(memberSelectType.Dependent)
                      resetOrganizedViewsState()
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
      await getUnconfirmedPatients()
    })()
  }, [])

  useEffect(() => {
    if (members.length && members.every(member => member.isSelected)) {
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
            {isFetching ? <CircleLoader className="middle-loader" /> : members.map((member, index) => (
              <Member
                key={index}
                member={member}
              >
                <button
                  type="button"
                  className={!member.isSelected ? "button member__button" : "button member__button member__button_edit"}
                  onClick={() => selectMember(member.id)}
                >
                  { !member.isSelected ? "Select" : "Edit" }
                </button>
              </Member>
            ))}
          </div>
          <div className="inputGroup">
            {loading ? <CircleLoader className="middle-loader" /> : (
              <button
                type="button"
                className={
                  confirmButtonState
                    ? 'button inputGroup__button migration__button migration__button_active'
                    : 'button inputGroup__button migration__button inputGroup__button_disabled'
                }
                onClick={confirmPatientsResults}
              >
                Confirm
              </button>
            )}
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