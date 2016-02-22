<?php

/**
 * Contains multiple KeyValue objects for a single page
 *
 */

class KeyValueArray extends WireArray {

	protected $page;

	public function __construct(Page $page) {
		$this->page = $page; 
	}

	public function makeBlankItem() {
		return $this->wire(new KeyValueArray($this->wire('page')));
	}

	public function has($key) {
		return $this->get($key) ? true : false;
	}

	public function get($key) {
		$match = null;

		if (Selectors::stringHasOperator($key)) {
			$match = $this->findOne($key);
		}

		if (!$match && ($found = $this->findOne("key=$key"))) {
			$match = $found;
		}

		if (!$match && ($found = $this->findOne("value=$key"))) {
			$match = $found;
		}

		return $match;
	}

	// public function remove($key) {
	// 	if($this->has($key)) {
	// 		$item = $this->data[$key];
	// 		unset($this->data[$key]);
	// 		$this->trackChange("remove", $item, null);
	// 		$this->trackRemove($item);
	// 	}

	// 	return $this;
	// 	// return parent::remove($key);
	// }

	public function remove($item) {
		// unset($this->data[$item]);
		// return;
		if(is_string($item)) $item = $this->get($item); 
		if(!$this->isValidItem($item)) throw new WireException("Invalid type to {$this->className}::remove(item)");
		parent::remove($item); 
		return $this; 
	}

	public function isValidItem($item) {
		return $item instanceof KeyValue;
	}

	public function add($item) {
		$item->page = $this->page; 
		return parent::add($item); 
	}

	public function set($key, $value = '') {
		// $item->page = $this->page; 
		$item = new KeyValue();
		$item->key = $key;
		$item->value = $value;
		return parent::add($item); 
	}

	// public function __toString() {
	// 	$out = '';
	// 	foreach($this as $item) $out .= $item; 
	// 	return $out; 
	// }
}

