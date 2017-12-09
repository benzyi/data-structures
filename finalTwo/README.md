# Final Assignment 2

### This is Final Assignment 2 for Data Structure, Fall 2017. This project's objectives were to create a sensor, keep it running, and record the data in a database. Then to create a UI/UX that corresponds with the data.

[![preview.png](https://github.com/benzyi/data-structures/blob/master/finalTwo/SQL.PNG)](http://ec2-18-216-156-193.us-east-2.compute.amazonaws.com:3000/)

[![preview.png](https://benzyi.github.io/data-structures/SQLhr.PNG)](http://ec2-18-216-156-193.us-east-2.compute.amazonaws.com:3000/hour)

### Abstract
Two previews above to split the SQL query to show first, every time the (presumably) the television (and it's supporting technology like Apple TV and speakers) was used down by the minute of usage. The second SQL query shows a larger picture of the data grouped by hour, which helps map the general hours of usage along with a clearer picture of the futon's position. 

Both are integrated into the same UI/UX visualization. The implied analysis is to determine when the usage of TV was focused watching or multi-task watching because the implication of the futon being flat, while the TV being on is that I was doing other things like eating or working on assignments while the TV ran in the background. If the TV was being used and the futon was upright, I was presumably focused only on watching TV.

### Proposed Features
1. Hover over each day and the minute of activation will appear for said day.
2. Hover over the minute to see the exact time of IR sensor detection.
3. Scroll through to see patterns of TV usage, and futon transformations for each day.

### Programs / Services
[mongodb](https://www.mongodb.com/)

[PostgreSQL](https://www.postgresql.org/)

[Amazon Web Services EC2](https://aws.amazon.com/ec2/)

[PM2](http://pm2.keymetrics.io/)