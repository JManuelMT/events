import React from 'react';
import { IonModal, IonButton } from '@ionic/react';

const EventDetail = ({ showModal, setShowModal }) => (
    <IonModal showBackdrop isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <div style={{ fontSize: '16px', textAlign: 'justify', padding: '20px', lineHeight: 2 }}>
            Here you should see some content about the event but I don't have time for this
            so you have a beatiful fake text: Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eveniet dolor porro dolorum excepturi
            possimus debitis modi esse voluptatum. Amet odit accusamus nihil totam alias iste quaerat iusto deserunt enim!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad omnis repudiandae ullam tenetur eos error nulla
            tempore vero, corrupti quas voluptates optio delectus asperiores sed. Vitae eius molestiae fugiat enim!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, a enim quaerat atque ea blanditiis autem
            quisquam esse ipsum, tenetur odit quia dignissimos harum nostrum dolorum fugiat, molestias nam obcaecati?
        </div>
        <IonButton style={{ margin: '20px' }} onClick={() => setShowModal(false)} color="primary">CLOSE</IonButton>
    </IonModal>
);

export default EventDetail;