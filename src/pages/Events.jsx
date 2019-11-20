import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import EventsData from '../eventsData.json';
import '../theme/events.css';
import getTagColor from '../utils/getTagColor';
import { funnel } from 'ionicons/icons';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('Hiring');
  const [eventsLength, setEventsLength] = useState(6);
  useEffect(() => {
    console.log('lamuerte1', filter)
    let datesEvents = EventsData.events.filter(
      (event => new Date(event.date) >= new Date()));
      if (filter !== 'All') {
        datesEvents = datesEvents.filter(dateEvent => dateEvent.type === filter);
      }
      console.log('lamuerte2', datesEvents)
    setEvents(datesEvents.slice(0, eventsLength))
  }, [filter, eventsLength]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonRow>
          <IonCol  size-xs="3" size-md="8">
            <h1 style={{ marginTop: '14px' }}>Events</h1>
          </IonCol>
          <IonCol size-xs="9" size-md="4">
            <IonItem>
              <IonLabel><IonIcon icon={funnel} /> Filter events</IonLabel>
                <IonSelect
                  value={filter}
                  okText="Okay"
                  cancelText="Dismiss"
                  onIonChange={({ detail }) => setFilter(detail.value)}
                >
                  <IonSelectOption value="Hiring">Hiring</IonSelectOption>
                  <IonSelectOption value="Information">Information</IonSelectOption>
                  <IonSelectOption value="Premium">Premium</IonSelectOption>
                  <IonSelectOption value="All">All</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
            <div className="previous_events">
              Load Previous Events
            </div>
          <IonRow>
            {
              events.map((event, index) => (
              <IonCol key={index}  size-md="4" size-xs="12">
                <IonCard className="card">
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonRow>
                        <IonCol size-md="8" size-lg="9" size-xs="9">
                          <div className="inline">
                            {event.title}
                          </div>
                        </IonCol>
                        <IonCol size-md="4" size-lg="3" size-xs="3">
                          <div className={getTagColor(event.type)}>{event.type}</div>
                        </IonCol>
                      </IonRow>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      <strong>Date: </strong>{event.date}
                    </p>
                    <p>
                      <strong>Location: </strong>{event.location}
                    </p>
                    <p>
                      <strong>Deadline: </strong>{event.deadline}
                    </p>
                    <div>
                      {event.countryImage}
                    </div>
                  </IonCardContent>
                  <div style={{ textAlign: 'right' }}>
                   <div className="applyBtn">
                      Apply Here
                   </div>
                  </div>
                </IonCard>
              </IonCol>
              ))
            }
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Events;
