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
  IonToast,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import EventsData from '../eventsData.json';
import '../theme/events.css';
import getTagColor from '../utils/getTagColor';
import { funnel } from 'ionicons/icons';
import EventDetail from './EventDetail';

const filterEvents = (filter, loadPrevious = false) => {
  let datesEvents = EventsData.events;
  if (!loadPrevious) {
    datesEvents = EventsData.events.filter(
      (event => new Date(event.date) >= new Date()));
  }
  if (filter !== 'All') {
    datesEvents = datesEvents.filter(dateEvent => dateEvent.type === filter);
  }
    return datesEvents;
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('Hiring');
  const [eventsLength, setEventsLength] = useState(9);
  const [hasNextEvents, setHasNextEvents] = useState(true);
  const [hasPrevEvents, setHasPrevEvents] = useState(true);
  const [showEventDetail, setEventDetail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showError,setShowError] = useState(false);

  useEffect(() => {
    setEvents(filterEvents(filter));
  }, [filter, eventsLength]);

  const nextEvents = () => {
    const newLengthEvents = eventsLength + 9;
    setEventsLength(newLengthEvents);
    if (newLengthEvents >= filterEvents(filter).length) {
      setHasNextEvents(false);
    }
  }

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
                  onIonChange={({ detail }) => {
                    setFilter(detail.value);
                    setEventsLength(9);
                    setHasNextEvents(true);
                    setHasPrevEvents(true);
                  }}
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
        <EventDetail showModal={showEventDetail} setShowModal={setEventDetail} />
        <IonGrid>
            {
              hasPrevEvents && (
                <div className="previous_events" onClick={() => {
                  setEvents(filterEvents(filter, true));
                  setHasPrevEvents(false);
                }}
                >
                  Load Previous Events
                </div>
              )
            }
          <IonRow>
            {
              events.slice(0, eventsLength).map((event, index) => (
              <IonCol key={index}  size-md="4" size-xs="12">
                <IonCard className="card" onClick={() => setEventDetail(true)}>
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
                   <div className="applyBtn" onClick={(e) => {
                     if (event.type !== 'Premium') {
                      setShowToast(true);
                     } else {
                      setShowError(true);
                     }
                     e.stopPropagation();
                    }}
                    >
                      Apply Here
                   </div>
                  </div>
                </IonCard>
              </IonCol>
              ))
            }
          </IonRow>
          {
            hasNextEvents && (
              <div className="previous_events" onClick={nextEvents}>
                See Next Events
              </div>
            )
          }
        </IonGrid>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="You have applied successfully"
          duration={5000}
          buttons={[
            {
              text: 'Done',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]}
          position="top"
          color="primary"
        />
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message="This event is exclusive for premium members"
          position="top"
          color="secondary"
          duration={5000}
          buttons={[
            {
              side: 'end',
              text: 'Buy Subscription!',
              handler: () => {
                window.open('https://vanhack.com/platform/checkout', '_blank');
              }
            },
            {
              text: 'Done',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Events;
