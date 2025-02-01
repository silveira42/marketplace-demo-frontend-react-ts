import './styles.css';
import React from 'react';

export type ModalProps = {
	close: () => void;
	children?: React.ReactNode;
	isLoading?: boolean;
};

export default function Modal(props: ModalProps) {
	return (
		<div className='modal-overlay'>
			<div className='modal-background' onClick={props.close} />
			<div className='modal-content' data-theme='dark'>
				{props.children}
				{props.isLoading && (
					<div className='modal-loading'>
						<div className='modal-loading-spinner' />
					</div>
				)}
			</div>
		</div>
	);
}
