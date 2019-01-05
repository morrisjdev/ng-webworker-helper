# ng-webworker-helper [![Maintainability](https://api.codeclimate.com/v1/badges/1c7beb2c8cb98f25a166/maintainability)](https://codeclimate.com/github/morrisjdev/ng-webworker-helper/maintainability)

This project is an extension for Angular that should make working with WebWorker simple. This project enables you to
run code in a seperate thread and make the UI run faster.

## Installation

To use the project use

```
npm install ng-webworker-helper -S
npm install concurrently -D
```


### Building the webworker files

You can now use Webworkers, but you have to enable Angular to transpile your webworker files into a seperate .js file.

First of all copy the files [webworker.webpack.config.js](webworker.webpack.config.js) and 
[webworker.webpack.dev.config.js](webworker.webpack.dev.config.js) in your projects root folder.
Then copy the file [src/tsconfig.worker.json](src/tsconfig.worker.json) to your src folder.

Now add this entries to the `angular.json` of your project:

```json
{
 ...,
 "architect": {
    ...,
    "build-worker": {
      "builder": "@angular-devkit/build-webpack:webpack",
      "options": {
        "webpackConfig": "./webworker.webpack.config.js"
      }
    },
    "dev-worker": {
      "builder": "@angular-devkit/build-webpack:webpack",
      "options": {
        "webpackConfig": "./webworker.webpack.dev.config.js"
      }
    },
    ...
  }
}
```

In your `package.json` add the entries
```
"build-worker": "ng run <projectname>:build-worker",
"dev-worker": "ng run <projectname>:dev-worker"
```
to the scripts section.

Change the scripts `build`  and `start` like this:
```
"start": "concurrently --kill-others \"npm run dev-worker\" \"ng serve\"",
"build": "npm run build-worker && ng build",
```

### Add provider in angular

In your `app.module.ts` add `NgWebworkerService` in the providers section.


## Usage

To use webworkers you have to create the folder `worker` in the src directory of your project.
Create a file named `main.worker.ts` with the following content:

````js
import {registerWebworker, WebworkerHandlerBase} from 'ng-webworker-helper';

registerWebworker({
  'test': TestWorker
});
````

Now you can create files with custom worker code for example `test.worker.ts`:
````
class TestWorker extends WebworkerHandlerBase {
  run(data: number): number {
    const before = new Date();
    let count = 0;

    this.send('das ist ein test');

    while (true) {
      count++;
      const now = new Date();
      if (now.valueOf() - before.valueOf() > data) {
        break;
      }
    }

    return count;
  }
}
````

You can execute the function in a worker using:

````
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private webworkerService: NgWebworkerService) {
  
    //This executes code in TestWorker 
    this.webworkerService.execute('test', 10000).subscribe(console.log);

    //This executes a custom function in a webworker thread
    this.webworkerService.executeFunction((t) => {
      return t * 10;
    }, 100).subscribe(console.log);

  }
}
````

## Author

[Morris Janatzek](http://morrisj.net) ([morrisjdev](https://github.com/morrisjdev))
