import React from 'react'
import Modal from './Modal'

function DeleteActorModal({handleDelete, setModal}) {
  return (
    <Modal>
						<h3>Точно видалити актора?</h3>
						<div>
							<button onClick={handleDelete}>Так</button>
							<button
								onClick={() =>
									setModal({ shouldShow: false, type: null })
								}
							>
								Ні
							</button>
						</div>
					</Modal>
  )
}

export default DeleteActorModal