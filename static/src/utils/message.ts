import { IntentMessage } from 'hermes-javascript'

type Slot = IntentMessage['slots'][0]

export const message = {
    // Helper to filter slots given their name, and potentially a lower threshold for the confidence level.
    // You can also use the onlyMostConfident boolean to return only a single slot with the highest confidence.
    // If no slot match the criterias, then returns null.
    getSlotsByName: (
        message: IntentMessage,
        slotName: string,
        { threshold = 0, onlyMostConfident = false } = {}
    ) : Slot | Slot[] | null => {
        if(onlyMostConfident) {
            return message.slots.reduce((acc, slot) => {
                if(slot.slotName === slotName && slot.confidenceScore > threshold) {
                    if(!acc || acc.confidenceScore < slot.confidenceScore)
                        return slot
                }
                return acc
            }, null)
        }
        return message.slots.filter(slot => slot.slotName === slotName && slot.confidenceScore > threshold)
    }
}