import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private localNotifications: LocalNotifications) {
    
  }

  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
}