import { ForMonitoring } from "../../ports/drivens";

export class MonitorStubAdapter implements ForMonitoring {
    log(event: string, message: string) {
        console.log(event, message)
    }
}