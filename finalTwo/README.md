# Final Assignment 2

### This is Final Assignment 2 for Data Structure, Fall 2017. This project's objectives were to create a sensor, keep it running, and record the data in a database. Then to create a UI/UX that corresponds with the data.

[![preview.png](https://github.com/benzyi/data-structures/blob/master/finalTwo/preview.png)](https://github.com/benzyi/data-structures/blob/master/finalTwo/preview.png)

#### URL for SQL grouped by exact minute an infrared signal was detected
[![preview.png](https://github.com/benzyi/data-structures/blob/master/finalTwo/SQL.PNG)](http://ec2-18-216-156-193.us-east-2.compute.amazonaws.com:3000/)

#### URL for SQL grouped by hour for a larger picture of the television and futon relationship
[![preview.png](https://github.com/benzyi/data-structures/blob/master/finalTwo/SQLhr.PNG)](http://ec2-18-216-156-193.us-east-2.compute.amazonaws.com:3000/hour)

### Abstract
Two previews above to split the SQL query to show first, every time the television (and it's supporting technology like Apple TV and speakers) was used down by the minute of usage. The second SQL query shows a larger picture of the data grouped by hour, which helps map the general hours of usage along with a clearer picture of the futon's position. 

Both are queries are integrated into the UI/UX visualization. The minutes of the IR sensor activation are mapped when hovering over the day, and can stay activated if clicked. The hours show the larger relationship between the television and the futon, which is visualized as the overarching time bars and the futon's position is specifically mapped hourly and not by the minute. I felt it wasn't reasonable to document the minute the futon changes position because it doesn't add much more value than knowing that it was flat or upright during the time an IR signal was detected.

The implied analysis is to determine when the usage of TV was focused watching or multi-tasked watching. The implication of the futon being flat, while the TV being on is that I was doing other things like eating or working on assignments while the TV ran in the background. If the TV was being used and the futon was upright, I was presumably focused only on watching TV.

At first glance, there are some seemingly erroneous timestamps. Initially, I thought my timezone might be off, but it is also possible by neighbor upstairs who is audibly awake and active until the wee hours of the night might be triggering the IR sensor at odd times.

### Proposed Features
1. Hover over each day and the minute of activation will appear for said day.
2. Hover over the minute to see the exact time of IR sensor detection.
3. Click anywhere on the day-of bar to activate its visibility to keep certain days up to see patterns in the minutes of sensor detection.
3. Scroll through to see patterns of TV usage, and futon transformations for each day.

### Programs / Services
[mongodb](https://www.mongodb.com/)

[PostgreSQL](https://www.postgresql.org/)

[Amazon Web Services EC2](https://aws.amazon.com/ec2/)

[PM2](http://pm2.keymetrics.io/)