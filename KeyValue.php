<?php

/**
 * An individual event item to be part of an EventArray for a Page
 *
 */
class KeyValue extends WireData {

	/**
	 * We keep a copy of the $page that owns this event so that we can follow
	 * its outputFormatting state and change our output per that state
	 *
	 */
	protected $page; 

	/**
	 * Construct a new Event
	 *
	 */
	public function __construct() {

		// define the fields that represent our event (and their default/blank values)
		$this->set('key', ''); 
		$this->set('value', ''); 
	}

	/**
	 * Set a value to the event: date, location or notes
	 *
	 */
	public function set($key, $value) {

		if($key == 'page') {
			$this->page = $value; 
			return $this; 

		} else if($key == 'key' || $key == 'value') {
			// regular text sanitizer
			$value = $this->sanitizer->text($value); 
		}

		return parent::set($key, $value); 
	}

	/**
	 * Retrieve a value from the event: date, location or notes
	 *
	 */
	public function get($key) {
		$value = parent::get($key); 

		// if the page's output formatting is on, then we'll return formatted values
		if($this->page && $this->page->of()) {

			if($key == 'key' || $key == 'value') {
				// return entity encoded versions of strings
				$value = $this->sanitizer->entities($value); 
			}
		}

		return $value; 
	}

	/**
	 * Just for fun: returns true if the event has already past
	 *
	 */
	public function isPast() {
		if($this->date < time()) return true;
		return false; 
	}

	/**
	 * Provide a default rendering for an event
	 *
	 */
	// public function renderEvent() {
	// 	// remember page's output formatting state
	// 	$of = $this->page->of();
	// 	// turn on output formatting for our rendering (if it's not already on)
	// 	if(!$of) $this->page->of(true);
	// 	$out = "<p><strong>$this->date</strong><br /><em>$this->location</em><br />$this->notes</p>";	
	// 	if(!$of) $this->page->of(false); 
	// 	return $out; 
	// }

	/**
	 * Return a string representing this event
	 *
	 */
	// public function __toString() {
	// 	// return $this->renderEvent();
	// 	return "$this->key: $this->value";
	// }

}

